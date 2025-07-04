#ifndef SHAPES_HPP
#define SHAPES_HPP

#include <QtWidgets/QWidget>
#include <QPainter>
#include <QMouseEvent>
#include <QDebug>
#include <QTimer>

#include "math_helper.hpp"
#include "vector2d.hpp"
#include "point2d.hpp"
#include "mouse.hpp"

namespace shapes{

    void draw_rect(QPainter *painter, int x, int y, int w, int h, Qt::GlobalColor color = Qt::blue, int thickness = 2){
        QPen pen(Qt::black);
        pen.setWidth(thickness);

        painter->setPen(pen);
        painter->fillRect(x, y, w, h, color);
        painter->drawRect(x, y, w, h);
    }

    void draw_rect_from_center(QPainter *painter, int x, int y, int w, int h, Qt::GlobalColor color = Qt::blue, int thickness = 2){
        QPen pen(Qt::black);
        pen.setWidth(thickness);

        painter->setPen(pen);
        painter->fillRect(x - (w / 2), y - (h / 2), w, h, color);
        painter->drawRect(x - (w / 2), y - (h / 2), w, h);
    }

    void draw_rect_from_center(QPainter *painter, int x, int y, int w, int h, QColor color = QColor::fromRgb(0, 0, 255), int thickness = 2){
        QPen pen(Qt::black);
        pen.setWidth(thickness);

        painter->setPen(pen);
        painter->fillRect(x - (w / 2), y - (h / 2), w, h, color);
        painter->drawRect(x - (w / 2), y - (h / 2), w, h);
    }

    void draw_line(QPainter *painter, Point2D initial, Point2D final, Qt::GlobalColor color = Qt::blue, int thickness = 2){
        QPen pen(Qt::black);
        pen.setWidth(thickness);

        painter->setPen(pen);

        painter->drawLine(
            initial.get_native_X(),
            initial.get_native_Y(),
            final.get_native_X(),
            final.get_native_Y()
        );
    }

} // namespace shapes

#endif // SHAPES_HPP