#include <bits/stdc++.h>
using namespace std;
class Solution
{
public:
    vector<vector<string>> groupAnagrams(vector<string> &strs)
    {
        unordered_map<string, vector<string>> hashmap;
        for (auto s : strs)
        {
            string t = s;
            sort(t.begin(), t.end());
            hashmap[t].push_back(s);
        }

        vector<vector<string>> res;
        for (auto entry : hashmap)
        {
            vector<string> temp;
            for (string str : entry.second)
            {
                temp.push_back(str);
            }

            res.push_back(temp);
        }

        return res;
    }
};