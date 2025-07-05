#ifndef SYSTEM_MANAGER_HPP
#define SYSTEM_MANAGER_HPP

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

namespace system{

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

    static string get_date_time_numbers(){
        std::string day = std::to_string(QDateTime::currentDateTime().date().day());
        std::string month = std::to_string(QDateTime::currentDateTime().date().month());
        std::string year = std::to_string(QDateTime::currentDateTime().date().year());

        std::string hour = std::to_string(QDateTime::currentDateTime().time().hour());
        std::string minute = std::to_string(QDateTime::currentDateTime().time().minute());
        std::string second = std::to_string(QDateTime::currentDateTime().time().second());

        return year + "-" + month + "-" + day + "___" + hour + "-" + minute + "-" + second; 
    }

}; // namespace system

#endif // SYSTEM_MANAGER_HPP