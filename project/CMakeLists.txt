cmake_minimum_required(VERSION 3.12)

# CHANGE ME
project( graphics )

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

set(MAIN_EXEC Main)
set(TEST_EXEC Test)

find_package(Qt5 COMPONENTS Widgets PrintSupport REQUIRED)

# Create list of dependencies
set(THIS_PACKAGE_INCLUDE_DEPENDS
  
)

# Find each dependency
foreach(Dependency IN ITEMS ${THIS_PACKAGE_INCLUDE_DEPENDS})
  find_package(${Dependency} REQUIRED)
endforeach()

# GTest
find_package(GTest CONFIG REQUIRED)
include(GoogleTest)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include /usr/include/x86_64-linux-gnu/qt5)

add_executable( ${MAIN_EXEC} src/main.cpp )
target_link_libraries( ${MAIN_EXEC} ${THIS_PACKAGE_INCLUDE_DEPENDS} Qt5::Widgets Qt5::PrintSupport)

target_compile_options(${MAIN_EXEC} PRIVATE -fPIC)
add_definitions(-DQT_NO_VERSION_TAGGING)

# TESTING
enable_testing()
add_executable( ${TEST_EXEC} test/test.cpp)
target_link_libraries(${TEST_EXEC} GTest::gtest_main)

# automatic
gtest_discover_tests(${TEST_EXEC})

# manual
# add_test(NAME my_test_case COMMAND my_test)