#ifndef SYSTEM_HPP
#define SYSTEM_HPP

#include <QtWidgets/QWidget>
#include <QPainter>
#include <QMouseEvent>
#include <QDebug>
#include <QTimer>
#include <QIcon>
#include <QScreen>
#include <QDateTime>

#include <atomic>
#include <stdexcept>
#include <chrono>
#include <ctime>

#include "math/math_helper.hpp"
#include "math/vector2d.hpp"
#include "math/point2d.hpp"
#include "util/mouse.hpp"
#include "util/utility.hpp"

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <netdb.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

using namespace std;

namespace sys{

    static std::string get_ip_address(){

        ifaddrs* interfaces;
        ifaddrs* iface;

        getifaddrs(&interfaces);

        for (iface = interfaces; iface != NULL; iface = iface->ifa_next) {

            if (!iface->ifa_addr) 
                continue;
            
            // if it is IP4
            if (iface->ifa_addr->sa_family == AF_INET) {
                
                in_addr* ip = &((sockaddr_in*)iface->ifa_addr)->sin_addr;
                char* adapter_name = iface->ifa_name;
                char ip_chars[INET_ADDRSTRLEN];

                inet_ntop(AF_INET, ip, ip_chars, sizeof(ip_chars));

                std::string ip_string = ip_chars;

                if(strings::starts_with(ip_string, "192"))
                    return ip_string;
            }
        }
        
        if (interfaces!=NULL) 
            freeifaddrs(interfaces);

        return NULL;
    }

    static QDateTime get_qdatetime(){
        return QDateTime::currentDateTime();
    }

    static string get_date_time_words(){
        return QDateTime::currentDateTime().toString().toStdString();
    }

    static string get_date_time_numbers(std::string unit_seperator = "-", std::string gap = "___", bool with_millis = false){

        QDateTime datetime = QDateTime::currentDateTime();

        // if the day is single digits, put 0 first
        std::string day = datetime.date().day() % 10 == datetime.date().day() ? "0" + std::to_string(datetime.date().day()) : std::to_string(datetime.date().day());

        std::string month = datetime.date().month() % 10 == datetime.date().month() ? "0" + std::to_string(datetime.date().month()) : std::to_string(datetime.date().month());
        std::string year = datetime.date().year() % 10 == datetime.date().year() ? "0" + std::to_string(datetime.date().year()) : std::to_string(datetime.date().year());

        std::string hour = datetime.time().hour() % 10 == datetime.time().hour() ? "0" + std::to_string(datetime.time().hour()) : std::to_string(datetime.time().hour());
        std::string minute = datetime.time().minute() % 10 == datetime.time().minute() ? "0" + std::to_string(datetime.time().minute()) : std::to_string(datetime.time().minute());
        std::string second = datetime.time().second() % 10 == datetime.time().second() ? "0" + std::to_string(datetime.time().second()) : std::to_string(datetime.time().second());
        std::string millis = datetime.time().msec() % 10 == datetime.time().msec() ? "0" + std::to_string(datetime.time().msec()) : std::to_string(datetime.time().msec());

        if(with_millis)
            second += "." + millis;

        return 
            year + 
            unit_seperator + 
            month + 
            unit_seperator + 
            day + 
            gap + 
            hour + 
            unit_seperator + 
            minute + 
            unit_seperator + 
            second;
    }

}; // namespace system

#endif // SYSTEM_HPP