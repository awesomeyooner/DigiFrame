#ifndef UTILITY_HPP
#define UTILITY_HPP

#include <QtWidgets/QWidget>
#include <QPainter>
#include <QMouseEvent>
#include <QDebug>
#include <QTimer>
#include "util/helpers/qthelper.hpp"

#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

namespace util{

    void log(std::string text){
        qDebug() << text.c_str();
    }

    void log(double text){
        qDebug() << text;
    }

    void log(int text){
        qDebug() << text;
    }

    void log(QPainter* painter, std::string text){
        painter->setPen(Qt::white);
        painter->setFont(QFont("Arial", 24, QFont::Bold));

        QtHelper::text_center(
                painter,
                text,
                0, 0
            );
    }

    void log(QPainter* painter, double text){
        log(painter, std::to_string(text));
    }
    
    void log(QPainter* painter, int text){
        log(painter, std::to_string(text));
    }

    void log(std::string header_type, std::string header, std::string message){
        std::cerr << "[" + header_type + "] " + header + ": " + message <<  std::endl;
    }

    void print_exception(std::exception& e){
        std::cerr << "[ERROR] Exception: " << e.what() << std::endl;
    }

    std::string read_html_file(const std::string& file_path) {
        //create the file object
        std::ifstream file(file_path);

        //if the file isnt open, then just return blank
        if (!file.is_open()) {
            return ""; 
        }

        //create a buffer
        std::stringstream buffer;
        
        //fill buffer
        buffer << file.rdbuf();

        //return the string
        return buffer.str();
    }

} // namespace util

namespace strings{

    bool starts_with(std::string compare, std::string starts){
        if(compare.length() < starts.length())
            return false;

        if(compare.substr(0, starts.size()) == starts)
            return true;
        else
            return false;
    }

    std::vector<std::string> sort_alphabetically_az(std::vector<std::string>& original){
        std::vector<std::string> sorted;

        for(std::string item : original){

            if(sorted.empty()){
                sorted.push_back(item);
                continue;
            }

            for(size_t i = 0; i < sorted.size(); i++){

                // if item is closer to A than the sorted one, replace its position and push the rest back
                if(item.compare(sorted.at(i)) < 0){
                    sorted.insert(sorted.begin() + i, item);
                    break;
                }
                // if you're comparing the last item of sorted and it hasn't been inserted, then put it in the back
                else if(i == sorted.size() - 1){
                    sorted.push_back(item);
                    break;
                }
            }
        }

        return sorted;
    }

    std::vector<std::string> sort_alphabetically_za(std::vector<std::string>& original){
        std::vector<std::string> sorted;

        for(std::string item : original){

            if(sorted.empty()){
                sorted.push_back(item);
                continue;
            }

            for(size_t i = 0; i < sorted.size(); i++){

                // if item is closer to A than the sorted one, replace its position and push the rest back
                if(item.compare(sorted.at(i)) > 0){
                    sorted.insert(sorted.begin() + i, item);
                    break;
                }
                // if you're comparing the last item of sorted and it hasn't been inserted, then put it in the back
                else if(i == sorted.size() - 1){
                    sorted.push_back(item);
                    break;
                }
            }
        }

        return sorted;
    }

} // namespace strings

#endif //UTILITY_HPP