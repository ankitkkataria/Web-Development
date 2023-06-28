#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prevPtr = NULL;
        ListNode* currPtr = NULL;
        ListNode* nextPtr = NULL;
        currPtr = head;
        
        while(currPtr){
            nextPtr = currPtr->next;
            currPtr->next = prevPtr;
            prevPtr = currPtr;
            currPtr = nextPtr;
        }
        
        return prevPtr;
    }
};