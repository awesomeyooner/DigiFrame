add_test( Testing.BasicTest [==[/home/dev/Documents/GitHub/Projects/C++/Digital Pictureframe/project/build/Test]==] [==[--gtest_filter=Testing.BasicTest]==] --gtest_also_run_disabled_tests)
set_tests_properties( Testing.BasicTest PROPERTIES WORKING_DIRECTORY [==[/home/dev/Documents/GitHub/Projects/C++/Digital Pictureframe/project/build]==] SKIP_REGULAR_EXPRESSION [==[\[  SKIPPED \]]==])
set( Test_TESTS Testing.BasicTest)
