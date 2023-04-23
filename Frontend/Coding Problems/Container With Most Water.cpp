#include <bits/stdc++.h>
class Solution
{
public:
    int maxArea(vector<int> &height)
    {
        int l = 0;
        int r = height.size() - 1;
        int res = INT_MIN;
        while (l < r)
        {
            res = max(res, min(height[l], height[r]) * (r - l));
            if (height[l] < height[r])
                l++;
            else
                r--;
        }

        return res;
    }
};