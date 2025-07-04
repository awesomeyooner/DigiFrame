#ifndef COLORS_HPP
#define COLORS_HPP

#include <QColor>
#include <cmath>
#include "math_helper.hpp"
#include "util/utility.hpp"

namespace colors{

    const QColor RED = QColor::fromRgb(255, 0, 0);
    const QColor ORANGE = QColor::fromRgb(255, 64, 0);
    const QColor YELLOW = QColor::fromRgb(255, 255, 64);
    const QColor GREEN = QColor::fromRgb(0, 255, 0);
    const QColor BLUE = QColor::fromRgb(0, 0, 255);
    const QColor PURPLE = QColor::fromRgb(127, 0, 127);
    
    QColor lerp(QColor start, QColor end, double t){
        double dR = end.red() - start.red();
        double dG = end.green() - start.green();
        double dB = end.blue() - start.blue();

        double red = (double)start.red() + (dR * t);
        double green = (double)start.green() + (dG * t);
        double blue = (double)start.blue() + (dB * t);

        return QColor::fromRgb(
            start.red() + (dR * t),
            start.green() + (dG * t),
            start.blue() + (dB * t)
        );
    }

    /**
     * @brief Returns a rainbow gradient given the percent, with 0 being red and 1 being purple
     * 
     * @param gradient How far along to access the gradient
     * @return QColor representation
     */
    QColor linear_RGB(double percent){
        double chunk_size = 1.0 / 5.0; //6 colors, red orange yellow green blue purple

        if(percent >= 0 && percent < chunk_size * 1){
            return lerp(RED, ORANGE, percent / (chunk_size * 1));
        }
        else if(percent >= chunk_size * 1 && percent < chunk_size * 2){
            return lerp(ORANGE, YELLOW, percent / (chunk_size * 2));
        }
        else if(percent >= chunk_size * 2 && percent < chunk_size * 3){
            return lerp(YELLOW, GREEN, percent / (chunk_size * 3));
        }
        else if(percent >= chunk_size * 3 && percent < chunk_size * 4){
            return lerp(GREEN, BLUE, percent / (chunk_size * 4));
        }
        else if(percent >= chunk_size * 4 && percent <= chunk_size * 5){
            return lerp(BLUE, PURPLE, percent / (chunk_size * 5));
        }
        else
            return QColor::fromRgb(0, 0, 0);
    }

    /**
     * @brief Returns a monochrome gradient given the percent, with 0 being all black and 1 being all white
     * 
     * @param percent How much white to give
     * @return QColor representation
     */
    QColor linear_mono(double percent){
        int intensity = 255 * percent;

        return QColor::fromRgb(intensity, intensity, intensity);
    }

} //namespace colors

#endif // COLORS_HPP