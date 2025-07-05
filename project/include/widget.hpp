#ifndef WIDGET_HPP
#define WIDGET_HPP

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
#include <iostream>
#include <filesystem>
#include <string>

#include "math/math_helper.hpp"
#include "math/vector2d.hpp"
#include "math/point2d.hpp"
#include "util/mouse.hpp"

#include <content_manager.hpp>
#include <system.hpp>

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

#include "sidebar.hpp"

using namespace std;

class Widget : public QWidget{

    public:

        static std::string requested_image;

        Widget(QWidget *parent = nullptr) : QWidget(parent), sidebar(PositionType::TOP, 200){

            // load_image("/home/dev/Documents/GitHub/Projects/C++/Digital Pictureframe/project/assets/images/the hood.png");
            check_images();
            load_image(requested_image);

            // Allow Mouse Movement
            setMouseTracking(true);

            // Allow Keyboard accesss
            grabKeyboard();

            Mouse::configure_binding(
                [this](){
                    sidebar.displace(-Mouse::get_swipe().get_Y());
                },
                MouseEvent::WHILE_PRESSED
            );

            Mouse::configure_binding(
                [this](){
                    sidebar.snap_based_on_active();
                },
                MouseEvent::ON_RELEASE
            );
        }

        void initialize(){
            sidebar.add_entry(
                [this](QPainter* painter){
                    string ip_address = sys::get_ip_address();
                    string datetime = sys::get_date_time_numbers();

                    painter->setFont(QFont("Arial", 24, QFont::Bold));
                    painter->setPen(Qt::yellow);

                    QtHelper::text_center_of(
                        painter, 
                        sidebar.max_rect,
                        ip_address,
                        0,
                        -sidebar.extension + sidebar.max_extension - 50
                    );

                    QtHelper::text_center_of(
                        painter, 
                        sidebar.max_rect,
                        datetime,
                        0,
                        -sidebar.extension + sidebar.max_extension + 50
                    );
                }
            );
        }

        void update() {
            QWidget::update();
            Mouse::update();

            if(requested_image != image_path){
                load_image(requested_image);
            }
        }

        static void check_images(){
            std::string images_folder = "../assets/images";

            std::vector<std::string> unsorted_files;

            for(const auto& entry : std::filesystem::directory_iterator(images_folder)){
                std::filesystem::path current_path = entry.path();

                if (std::filesystem::is_regular_file(current_path)) {
                    std::string filename = current_path.filename().string();
                    
                    unsorted_files.push_back(filename);
                }
            }

            std::vector<std::string> sorted_files = strings::sort_alphabetically_za(unsorted_files);

            std::string newest_file = sorted_files.at(0);

            for(int i = 0; i < sorted_files.size(); i++){
                util::log("DEBUG", "Files", sorted_files.at(i));
            }

            requested_image = images_folder + "/" + newest_file;
        }

        void load_image(string path){
    
            if(!main_image.load(QString::fromStdString(path))){
                qFatal("FAILED!");
            }

            image_path = path;

            previous_image_paths.push_back(path);
        }

        void render_image(QPainter* painter, QImage& image){

            if(image.isNull())
                return;

            painter->setRenderHint(QPainter::SmoothPixmapTransform);

            QSize scaled_size = image.size().scaled(
                size(),
                Qt::KeepAspectRatio
            );

            int center_x = (width() - scaled_size.width()) / 2;
            int center_y = (height() - scaled_size.height()) / 2;

            QRect image_rectangle(center_x, center_y, scaled_size.width(), scaled_size.height());

            // Draw a black background
            painter->fillRect(rect(), Qt::black);

            // Draw the image
            painter->drawImage(image_rectangle, image);

            // === DRAW OVERLAYS ===
            // 1. Draw text
            painter->setPen(Qt::white);
            painter->setFont(QFont("Arial", 24, QFont::Bold));
            painter->drawText(rect().adjusted(0, 0, 0, -50), 
                            Qt::AlignBottom | Qt::AlignHCenter,
                            "Sample Overlay Text");
            
            // 2. Draw icon
            QIcon icon("../assets/images/icon.png");
            int iconSize = 64;
            icon.paint(painter, 
                    width() - iconSize - 20, 
                    height() - iconSize - 20,
                    iconSize, iconSize);
            
            // 4. Draw semi-transparent rectangle
            // painter->setBrush(QColor(0, 0, 0, 150));  // Semi-black
            // painter->setPen(Qt::NoPen);
            // painter->drawRect(
            //     0, 0, 
            //     conversions::width, math::clamp(-(int)Mouse::get_swipe().get_Y(), 0, 200)
            // );        
        }

    protected:

        void mouseMoveEvent(QMouseEvent *e) override{
            QPoint position = e->pos();

            Mouse::update_point(
                Point2D::from_native(
                    position.x(), position.y()
                )
            );
        }

        void mousePressEvent(QMouseEvent *e) override{
            if(e->button() == Qt::LeftButton){
                Mouse::update_press(true);
            }
        }

        void mouseReleaseEvent(QMouseEvent *e) override{
            if(e->button() == Qt::LeftButton){
                Mouse::update_press(false);
            }
        }

        void paintEvent(QPaintEvent *e){
            
            if(main_image.isNull())
                return;   

            QPainter painter(this);

            render_image(&painter, main_image);

            sidebar.draw(&painter);
        }

        void keyPressEvent(QKeyEvent* event) override {
            if (event->key() == Qt::Key_Escape) {
                qApp->quit();
            }
        }

    private:
        Sidebar sidebar;
        std::string image_path;
        QImage main_image;
        vector<string> previous_image_paths;


}; // class Widget

std::string Widget::requested_image = "";

#endif // WIDGET_HPP