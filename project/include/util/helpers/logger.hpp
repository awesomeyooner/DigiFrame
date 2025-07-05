#ifndef LOGGER_HPP
#define LOGGER_HPP

#include <string>
#include "../../system.hpp"
#include <fstream>

class Logger{
    
    public:
        Logger(){

        }

        bool initialize(){
            std::string datetime = sys::get_date_time_numbers();
            std::string file_name = "log_" + datetime;
            log_file.open(file_name);

            return is_file_open();
        }

        void log(std::string text){
            if(!is_file_open())
                return;

            
        }

        bool is_file_open(){
            return log_file.is_open();
        }

    private:
        std::ofstream log_file;

}; // class Logger

#endif // LOGGER_HPP