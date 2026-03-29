#ifndef PROGRAM_HPP
#define PROGRAM_HPP

#include "util/helpers/logger.hpp"

class Program{

    public:
        // static bool exit;
        
        static bool should_exit(){
            return exit;
        }

        static bool still_alive(){
            return !exit;
        }

        static void stop_program(){
            exit = true;
            Logger::info("Program stop requested");
        }

    private:
        static bool exit;

}; // class program

bool Program::exit = false;

#endif // PROGRAM_MANAGER_HPP