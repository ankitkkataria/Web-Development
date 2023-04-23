#include <bits/stdc++.h>
using namespace std;
class mathy
{
public:
    double pi = 4.22;
    int computeSum(int a, int b)
    {
        return a + b;
    }
};

int main()
{
    mathy mathObj;
    int x = 4;
    int y = 1;
    int z = mathObj.computeSum(x, y);
    cout << "This value is the sum of x & y " << z << endl;
    cout << mathObj.pi << endl;
    return 0;
}