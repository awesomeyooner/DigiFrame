#ifndef LOGGER_HPP
#define LOGGER_HPP

#include <string>
#include "../../system.hpp"
#include <fstream>

class Logger{
    
    public:
        static std::ofstream log_file;

        static bool initialize(){
            std::string datetime = sys::get_date_time_numbers("-", "_");
            std::string file_name = "log_" + datetime + ".log";
            log_file.open("../logs/" + file_name);

            if(is_file_ok()){
                info("Program Started!");
                return true;
            }
            else{
                error("Failed to create .log file!");
                return false;
            }
        }

        static void close(){
            if(!is_file_ok())
                return;

            info("Program Ended!");
            log_file.close();
        }

        static void info(std::string text, bool write_file = true){
            log("INFO", text, write_file);
        }

        static void error(std::string text, bool write_file = true){
            log("ERROR", text, write_file);
        }

        static void debug(std::string text, bool write_file = true){
            log("DEBUG", text, write_file);
        }

        static void log(std::string header, std::string text, bool write_file = true){
            std::string formatted = format_text(header, text);

            if(write_file)
                write_to_file(formatted);

            std::cerr << formatted << std::endl;
        }

        static std::string format_text(std::string header, std::string text){
            std::string datetime = sys::get_date_time_numbers(":", " ", true);
            std::string formatted = datetime + " [" + header + "] " + text;

            return formatted;
        }

        static void write_to_file(std::string text){
            if(!log_file && !is_file_ok())
                return;

            log_file << text << std::endl;
        }

        static bool is_file_ok(){
            return log_file && log_file.is_open();
        }

    private:
       
}; // class Logger

std::ofstream Logger::log_file;

#endif // LOGGER_HPP