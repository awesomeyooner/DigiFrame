#include <gtest/gtest.h>

#include "math/math_helper.hpp"

TEST(Testing, BasicTest)
{
  std::string actual = "hello";
  std::string expected = "hello";

  ASSERT_EQ(actual, expected);
}

int main(int argc, char ** argv)
{
  testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}