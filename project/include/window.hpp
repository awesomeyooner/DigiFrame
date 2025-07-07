#ifndef WINDOW_HPP
#define WINDOW_HPP

#include <QtWidgets/QMainWindow>
#include "widget.hpp"
#include <QTimer>

#include "math/math_helper.hpp"

#include "util/mouse.hpp"

#include "server.hpp"
#include "program.hpp"

class Window : public QMainWindow{

    public:
        Window(QWidget *parent = nullptr) : QMainWindow(parent){
            
            setWindowState(Qt::WindowFullScreen);
            setWindowFlag(Qt::FramelessWindowHint);
            setAttribute(Qt::WA_OpaquePaintEvent);

            server.initialize();

            widget = new Widget(this);
            setCentralWidget(widget); 
            widget->initialize();

            timer = new QTimer(this);
            connect(timer, &QTimer::timeout, this, &Window::update);
            timer->start(20);

            thread = std::thread(
                [this](){
                    while(Program::still_alive()){
        
                        server.update();
                    }
                }
            );
        }

   

        void update(){
            QMainWindow::update();
            widget->update();

            conversions::width = width();
            conversions::height = height();
        }

        void join(){
            thread.join();
        }

    private:
        Widget *widget;
        QTimer *timer;
        Server server;

        std::thread thread;

}; // class Window

#endif // WINDOW_HPP