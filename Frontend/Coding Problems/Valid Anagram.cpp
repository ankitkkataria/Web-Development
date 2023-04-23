#include <bits/stdc++.h>
class Solution
{
public:
    bool isAnagram(string s, string t)
    {
        vector<int>hashmap(26,0);
        for(char c : s)
            hashmap[c-'a']++;
        for(char c : t)
            hashmap[c-'a']--;
        for(int i = 0 ; i < 26 ; i++)
            if(hashmap[i] != 0)
            return false;

        return true;
    }
};