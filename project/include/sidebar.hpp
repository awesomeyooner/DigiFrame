#ifndef SIDEBAR_HPP
#define SIDEBAR_HPP

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
#include <functional>

#include "math/math_helper.hpp"
#include "math/vector2d.hpp"
#include "math/point2d.hpp"
#include "util/mouse.hpp"

#include <content_manager.hpp>
#include <system_manager.hpp>

#include "util/helpers/qthelper.hpp"
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

enum class PositionType{
    LEFT,
    RIGHT,
    TOP,
    BOTTOM
}; // enum class PositionType

struct SidebarEntry{

    std::function<void(QPainter*)> draw;

    SidebarEntry(std::function<void(QPainter*)> _draw) : draw(_draw){}
}; // struct SidebarEntry

class Sidebar{

    public:

        QRect max_rect;
        QRect bar_rect;

        int max_extension;
        int extension;

        Sidebar(PositionType _type, int _max_extension){
            type = _type;
            max_extension = _max_extension;
            extension = 0;
            active = false;
        }

        bool is_active(){
            return active;
        }

        void snap_based_on_active(){
            if(extension > max_extension * 0.75)
                active = true;
            else if(extension < max_extension * 0.75)
                active = false;

            if(active)
                extension = max_extension;
            else
                extension = 0;
        }

        void displace(int displacement){
            if(active)
                set_extension(displacement + max_extension);
            else
                set_extension(displacement);
        }

        void set_extension(int _extension){
            extension = math::clamp(_extension, 0, max_extension);
        }

        void add_entry(std::function<void(QPainter*)> _draw){
            add_entry(SidebarEntry(_draw));
        }

        void add_entry(SidebarEntry entry){
            entries.push_back(entry);
        }

        void draw(QPainter* painter){

            switch(type){
                case PositionType::TOP:
                    painter->setBrush(QColor(0, 0, 0, 150));  // Semi-black
                    painter->setPen(Qt::NoPen);

                    bar_rect.setCoords(
                        0, 0, 
                        conversions::width, math::clamp(extension, 0, max_extension)
                    );

                    max_rect.setCoords(
                        0, 0, 
                        conversions::width, max_extension
                    );

                    painter->drawRect(bar_rect);   
                    break;
            }

            for(SidebarEntry entry : entries){
                entry.draw(painter);
            }
        }

    private:

        PositionType type;

        bool active;

        std::vector<SidebarEntry> entries;

}; // class Sidebar

#endif // SIDEBAR_HPP