#ifndef CONTENT_MANAGER_HPP
#define CONTENT_MANAGER_HPP

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

struct ContentHeader{
    QDateTime date_sent;
    string user_to;
    string user_from;
}; // struct ContentHeader

struct Content{

    ContentHeader header;

    string image_path;
    string message;

}; // struct Content

class ContentManager{

    public:

    private:

}; // class ContentManager

#endif // CONTENT_MANAGER_HPP