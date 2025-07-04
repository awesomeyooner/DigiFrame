#ifndef QTHELPER_HPP
#define QTHELPER_HPP

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

class QtHelper{

    public:

        static void text_native(QPainter* painter, string text, int x, int y, QColor color){
            painter->setPen(color);
            text_native(painter, text, x, y);
        }

        static void text_native(QPainter* painter, string text, int x, int y){
            painter->drawText(
                get_widget_rect().adjusted(
                    conversions::cartesian_to_native_X(x), 
                    conversions::cartesian_to_native_Y(y),
                    conversions::cartesian_to_native_X(x), 
                    conversions::cartesian_to_native_Y(y)
                ),
                Qt::AlignVCenter | Qt::AlignHCenter,
                QString(text.c_str())
            );
        }

        static void text_center(QPainter* painter, string text, int x, int y, QColor color){
            painter->setPen(color);
            text_center(painter, text, x, y);
        }

        static void text_center(QPainter* painter, string text, int x, int y){
            painter->drawText(
                get_widget_rect().adjusted(x, -y, x, -y), 
                Qt::AlignVCenter | Qt::AlignHCenter,
                QString(text.c_str())
            );
        }

        static void text_center(QPainter* painter, string text, Point2D point){
            painter->drawText(
                get_widget_rect().adjusted(point.get_X(), -point.get_Y(), point.get_X(), -point.get_Y()), 
                Qt::AlignVCenter | Qt::AlignHCenter,
                QString(text.c_str())
            );
        }

        static void text_center(QPainter* painter, string text, Point2D point, QColor color){
            painter->setPen(color);
            text_center(painter, text, point);
        }

        static void text_center_static_to(QPainter* painter, QRect rect, string text, int x, int y){
            painter->drawText(
                rect.adjusted(x, -y, x, -y), 
                Qt::AlignVCenter | Qt::AlignHCenter,
                QString(text.c_str())
            );
        }

        static void text_center_of(QPainter* painter, QRect center, string text, int x_add, int y_add){
            painter->drawText(
                center.adjusted(x_add, -y_add, x_add, -y_add), 
                Qt::AlignVCenter | Qt::AlignHCenter,
                QString(text.c_str())
            );
        }

        static void text_center_of(QPainter* painter, QRect center, string text, Point2D add){
            painter->drawText(
                center.adjusted(add.get_X(), -add.get_Y(), add.get_X(), -add.get_Y()), 
                Qt::AlignVCenter | Qt::AlignHCenter,
                QString(text.c_str())
            );
        }

        static QRect get_widget_rect(){
            return QRect(0, 0, conversions::width, conversions::height);
        }

        static QFont font_with_size(int size, bool bold = false){
            return bold ? QFont("Arial", size, QFont::Bold) : QFont("Arial", size);
        }

}; // class QtHelper

#endif // QTHELPER_HPP