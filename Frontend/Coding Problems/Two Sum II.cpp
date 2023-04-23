class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int l = 0;
        int r = numbers.size()-1;
        while(l < r){
            int sumOfTheseNumbers = numbers[l]+numbers[r];
            if(sumOfTheseNumbers < target)
               l++;
            else if (sumOfTheseNumbers > target)
                r--;
            else 
                return {l+1,r+1};
        }

        return {0,0};
    }
};