#include <bits/stdc++.h>
using namespace std;

// priority_queue method.
class Solution
{
public:
    vector<int> topKFrequent(vector<int> &nums, int k)
    {
        // I could use a priority_queue that can store the frequencies of all the elements and just when needed i can take out the top k elements
        priority_queue<pair<int, int>> pq;
        vector<int> res; // This will store my final result.
        unordered_map<int, int> hashmap;
        for (int num : nums)
            hashmap[num]++;
        for (auto entry : hashmap)
            pq.push({entry.second, entry.first});
        for (int i = 0; i < k; i++)
        {
            res.push_back(pq.top().second);
            pq.pop();
        }

        return res;
    }
};

// indexRepresentsFrequency Method.
class Solution
{
public:
    vector<int> topKFrequent(vector<int> &nums, int k)
    {
        int n = nums.size();
        vector<vector<int>> indexRepresentsFreq(n + 1, vector<int>());
        unordered_map<int, int> hashmap;
        vector<int> res;
        for (int num : nums)
            hashmap[num]++;
        for (auto entry : hashmap)
            indexRepresentsFreq[entry.second].push_back(entry.first);
        for (int i = n; i >= 0 && res.size() < k; i--)
        {
            for (int num : indexRepresentsFreq[i])
            {
                res.push_back(num);
                if (res.size() == k)
                    break;
            }
        }

        return res;
    }
};
