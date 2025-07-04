#ifndef MOUSE_HPP
#define MOUSE_HPP

#include <functional>

#include "math/math_helper.hpp"
#include "math/vector2d.hpp"
#include "math/point2d.hpp"

enum class MouseEvent{
    ON_PRESS,
    ON_RELEASE,
    WHILE_PRESSED,
    WHILE_RELEASED
};

class Mouse{

    public:

        Mouse(){}

        static void configure_binding(std::function<void()> runnable, MouseEvent bind_type){
            switch(bind_type){
                case MouseEvent::ON_PRESS:
                    on_press = runnable;
                    break;

                case MouseEvent::ON_RELEASE:
                    on_release = runnable;
                    break;

                case MouseEvent::WHILE_PRESSED:
                    while_pressed = runnable;
                    break;

                case MouseEvent::WHILE_RELEASED:
                    while_released = runnable;
                    break;
            }
        }

        static void configure_on_swipe(std::function<void(Vector2D)> runnable){
            on_swipe = runnable;
        }

        static void update(){

            // if you are now pressed but previously not pressed, PRESSED
            if(pressed && !previous_pressed){

                previous_point.set_point(point);

                if(on_press != nullptr)
                    on_press();
            }
            //if you are not pressed but previously pressed, RELEASED
            else if(!pressed && previous_pressed){

                if(on_release != nullptr)
                    on_release();

                if(on_swipe != nullptr)
                    on_swipe(swipe);
            }

            // WHILE_PRESSED
            if(pressed){

                swipe.set_vector(point.get_vector2d(previous_point));

                if(while_pressed != nullptr)
                    while_pressed();

            }

            // WHILE_RELEASED
            else if(!pressed){

                if(while_released != nullptr)
                    while_released();
            }

            update_press(pressed);
        }

        static void update_point(Point2D refresh){
            Mouse::point.set_point(refresh);
        }

        static void update_press(bool _pressed){
            previous_pressed = pressed;
            pressed = _pressed;
        }

        static Point2D get(){
            return Mouse::point;
        }

        static Point2D get_previous(){
            return Mouse::previous_point;
        }

        static Vector2D get_swipe(){
            return swipe;
        }

        static bool is_pressed(){
            return pressed;
        }

    private:
        static Point2D point;
        static Point2D previous_point;

        static Vector2D swipe;

        static bool pressed;
        static bool previous_pressed;

        static std::function<void()> on_press;
        static std::function<void()> on_release;
        static std::function<void()> while_pressed;
        static std::function<void()> while_released;

        static std::function<void(Vector2D)> on_swipe;
        

}; // class Mouse

Point2D Mouse::point = Point2D();
Point2D Mouse::previous_point = Point2D();

Vector2D Mouse::swipe = Vector2D();

bool Mouse::pressed = false;
bool Mouse::previous_pressed = false;

std::function<void()> Mouse::on_press = nullptr;
std::function<void()> Mouse::on_release = nullptr;
std::function<void()> Mouse::while_pressed = nullptr;
std::function<void()> Mouse::while_released = nullptr;

std::function<void(Vector2D)> Mouse::on_swipe = nullptr;


#endif // MOUSE_HPP