#ifndef LOGGER_HPP
#define LOGGER_HPP

#include <string>
#include "../../system.hpp"
#include <fstream>

class Logger{
    
    public:
        static std::ofstream log_file;

        Logger(){

        }

        static bool initialize(){
            std::string datetime = sys::get_date_time_numbers("-", "_");
            std::string file_name = "log_" + datetime + ".log";
            log_file.open("../logs/" + file_name);

            if(is_file_open()){
                log("INFO", "Program Started!");
                return true;
            }
            else
                return false;
        }

        static void log(std::string header, std::string text){
            std::string datetime = sys::get_date_time_numbers(":", " ");
            log(datetime + " [" + header + "] " + text);
        }

        static void log(std::string text){
            if(!is_file_open() && !log_file)
                return;

            log_file << text << std::endl;
        }

        static bool is_file_open(){
            return log_file.is_open();
        }

    private:
       
}; // class Logger

std::ofstream Logger::log_file;

#endif // LOGGER_HPP