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
#include "program.hpp"

int main(int argc, char* argv[]) {
    // Code to be executed

    // Initialize Logger
    Logger::initialize();

    // Start the QtGui
    QApplication app(argc, argv);

    Window window;

    window.resize(1600, 800);
    window.show();

    app.exec();

    window.join();

    // Stop Logger
    Logger::close();

    return 0;
}