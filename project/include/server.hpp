#ifndef SERVER_HPP
#define SERVER_HPP

#include <boost/asio/ip/tcp.hpp>
#include <boost/asio/io_context.hpp>
#include <boost/asio/write.hpp>
#include <boost/asio/socket_base.hpp>
#include <boost/asio/read.hpp>
#include <boost/asio/read_until.hpp>
#include <boost/asio/streambuf.hpp>
#include <boost/algorithm/string.hpp>

#include <iostream>
#include <string>
#include <mutex>
#include <thread>
#include <iostream>
#include <ctime>
#include <thread>
#include <chrono>
#include <sstream>
#include <vector>
#include <fstream>
#include <vector>
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

#include "util/utility.hpp"

using namespace boost::asio;
using namespace boost::asio::ip;

enum class ResponseType{
    OK = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}; // enum class ResponseType
class Server{

    public:

        io_context context;
        tcp::acceptor acceptor;

        Server(int port = 8080) : acceptor(context, tcp::endpoint(tcp::v4(), port)){}

        void initialize(){

        }

        void update(){
            tcp::socket socket(context);
            acceptor.accept(socket);

            //run handle_client asyncronously
            handle_client(std::move(socket));
            // std::thread(&Server::handle_client, this, std::move(socket)).detach();
        }

        void debug_buffer(boost::asio::streambuf& buf) {
            auto bufs = buf.data();
            std::string data(boost::asio::buffers_begin(bufs), boost::asio::buffers_end(bufs));
            std::cerr << "==== BUFFER CONTENTS ====\n";
            std::cerr << "Size: " << data.size() << " bytes\n";
            std::cerr << "Content: ";
            for (char c : data) {
                if (c == '\r') std::cerr << "\\r";
                else if (c == '\n') std::cerr << "\\n";
                else if (std::isprint(c)) std::cerr << c;
                else std::cerr << '?';
            }
            std::cerr << "\n==== END BUFFER ====\n";
        }

        void handle_client(tcp::socket socket){
            try{
                boost::asio::streambuf buf;
                boost::asio::read_until(socket, buf, "\r\n\r\n");
                std::istream request_stream(&buf);
                std::string request_line;
                std::getline(request_stream, request_line);

                std::istringstream iss(request_line);
                std::string method, path, protocol;
                iss >> method >> path >> protocol;

                // std::cerr << "[DEBUG] Starting header reading...\n";

                // Read the Header
                std::string header_buffer;
                std::string header_line = "";

                std::unordered_map<std::string, std::string> headers;

                // Extract Headers
                while (std::getline(request_stream, header_buffer)) {

                    // Remove trailing '\r' if present
                    if(!header_buffer.empty() && header_buffer.back() == '\r')
                        header_buffer.pop_back();

                    header_line += header_buffer;

                    size_t colon_position = header_buffer.find(':');

                    if(colon_position != std::string::npos){
                        std::string key = boost::algorithm::to_lower_copy(boost::algorithm::trim_copy(header_buffer).substr(0, colon_position));
                        std::string value = boost::algorithm::trim_copy(header_buffer).substr(colon_position + 1);

                        headers[key] = value;
                    }

                    // Check for end of headers
                    // if (header_buffer.empty()) {
                    //     std::cerr << "[DEBUG] Found empty line (end of headers)\n";
                    //     break;
                    // }
                    
                    // DEBUG: Print raw header line
                    // std::cerr << "[DEBUG] Raw header: " << header_buffer << "\n";        
                }

                // Print everything in the map
                for(const auto& pair : headers){
                    std::cerr << "[DEBUG] Header Map: " << pair.first << ": " << pair.second << "\n";
                }

                std::cerr << "\n";

                // std::cerr << "[DEBUG] Unpretty Header: " << header_line << "\n";
                // std::cerr << "[DEBUG] End of header reading...\n";

                // Handle GET requests
                if(method == "GET"){

                    // Serve HTML page
                    if(path == "/"){
                        std::string html_content = util::read_html_file("../assets/page/index.html");
                        send_response(&socket, ResponseType::OK, html_content, "text/html");
                        return;
                    }
                    else if(path == "/alive"){
                        send_response(&socket, ResponseType::OK);
                    }
                    else{
                        send_response(&socket, ResponseType::NOT_FOUND);
                        return;
                    }
                }
                // Handle POST requests
                else if(method == "POST"){

                    size_t bytes_already_consumed = static_cast<size_t>(request_stream.tellg()) + 1;
                    size_t bytes_remaining_in_buffer = buf.size() - bytes_already_consumed;

                    size_t content_length = std::stoul(headers.at("content-length"));
                    std::vector<char> body(content_length);

                    if(bytes_remaining_in_buffer > 0){
                        size_t bytes_to_read = std::min(bytes_remaining_in_buffer, content_length);
                        request_stream.read(body.data(), bytes_to_read);
                    }

                    size_t remaining_bytes = content_length - bytes_remaining_in_buffer;

                    if(remaining_bytes > 0){
                        boost::system::error_code error_code;
                        size_t bytes_read = boost::asio::read(
                            socket,
                            boost::asio::buffer(body.data() + bytes_remaining_in_buffer, remaining_bytes),
                            error_code
                        );
                        if (error_code || bytes_read != remaining_bytes) {
                            std::cerr << "Failed to read full body: "
                                    << (error_code ? error_code.message() : "incomplete read") 
                                    << "\n";
                            send_response(&socket, ResponseType::INTERNAL_ERROR);
                            return;
                        }
                    }

                    std::string body_string(body.begin(), body.end());

                    if(path == "/upload"){
                    
                        std::string content_type = headers.at("content-type");

                        std::string boundary = boost::algorithm::trim_copy(
                            content_type.substr(
                                // it's + 9 because 'boundary=' is nine characters
                                content_type.find("boundary=") + 9
                            )
                        );

                        size_t boundary_position = content_type.find(boundary);

                        size_t header_end = body_string.find("\r\n\r\n");

                        // std::cerr << "[DEBUG] Boundary: " << boundary << "\n";

                        if(header_end == std::string::npos){
                            send_response(&socket, ResponseType::INTERNAL_ERROR);
                            std::cerr << "[ERROR] header end error" << "\n";
                            return;
                        }

                        size_t image_start = header_end + 4;

                        size_t image_end = body_string.find(boundary, image_start);

                        if(image_end == std::string::npos){
                            send_response(&socket, ResponseType::INTERNAL_ERROR);
                            std::cerr << "[ERROR] image end error" << "\n";
                            return;
                        }

                        if (image_end >= 2 && body_string.substr(image_end - 2, 2) == "\r\n") {
                            image_end -= 2;
                        }

                        std::string image_data = body_string.substr(image_start, image_end - image_start);
                        
                        std::string image_name = "image_" + sys::get_date_time_numbers() + ".png";
                        std::ofstream file("../assets/images/" + image_name, std::ios::binary);
                        file.write(&body[image_start], image_end - image_start);

                        send_response(&socket, ResponseType::OK);
                        util::log("DEBUG", "", "Image Downloaded");

                        Widget::check_images();
                        
                        return;
                    }
                }
                

                
            }
            catch(std::exception& e){
                qDebug() << e.what();
                std::cerr << "Exception: " << e.what() << std::endl;
            }
        }

        void send_response(tcp::socket* socket, ResponseType response_type = ResponseType::OK, std::string body = "", std::string content_type = ""){
            std::string response;

            std::string response_type_chunk = "HTTP/1.1 ";
            std::string content_type_chunk = content_type.empty() ? "" : "Content-Type: " + content_type + "\r\n";
            std::string content_length_chunk = "Content-Length: " + std::to_string(body.length()) + "\r\n";
            std::string connenction_chunk = "Connection: close\r\n\r\n";

            switch(response_type){
                case ResponseType::OK:
                    response_type_chunk += "200 OK\r\n";
                    break;
                case ResponseType::NOT_FOUND:
                    response_type_chunk += "404 Not Found\r\n";
                    break;
                case ResponseType::INTERNAL_ERROR:
                    response_type_chunk += "500 Internal Error\r\n";
                    break;
                case ResponseType::BAD_REQUEST:
                    response_type_chunk += "400 Bad Request\r\n";
                    break;
            }

            response = 
                response_type_chunk +
                content_type_chunk +
                content_length_chunk + 
                connenction_chunk +
                body;

            write(*socket, buffer(response));
        }

    private:

    
}; // class Server

#endif // SERVER_HPP