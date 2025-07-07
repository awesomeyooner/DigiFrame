#include <string>
#include <iostream>
#include <unistd.h>
#include <cstdint>

#include <QtWidgets/QApplication>
#include <QtWidgets/QPushButton>
#include <QMainWindow>
#include <QCursor>
#include <QDebug>

#include <thread>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <netdb.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <stdio.h>      
#include <sys/types.h>
#include <ifaddrs.h>
#include <netinet/in.h> 
#include <string.h> 
#include <arpa/inet.h>
#include <fstream>

#include "widget.hpp"
#include "window.hpp"
#include "util/helpers/logger.hpp"

int main(int argc, char* argv[]) {
    // Code to be executed
    // QApplication app(argc, argv);

    // Window window;

    // window.resize(1600, 800);
    // window.show();

    // app.exec();

    // window.join();

    Logger::initialize();
    std::cerr << Logger::is_file_open() << std::endl;
    Logger::log("hello");

    return 0;
}