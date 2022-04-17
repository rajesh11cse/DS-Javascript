import java.util.*;
import java.util.Queue;
import java.util.LinkedList;

// https://www.geeksforgeeks.org/print-nodes-in-the-top-view-of-binary-tree-set-3/

public class printTopViewBTree {

	static class Node{
		int data;
		Node left;
		Node right;
		Node(int val){
			data = val;
			left = right = null;
		}
	} 
	
	static class Pair{
		Node first;
		int second;
		Pair(Node n, int a){
			first = n;
			second = a;
		}
	}
	
	static void topView(Node root) {
		
		if (root == null)
			return;
		
		Node temp = null;
		
		Queue <Pair> q = new LinkedList<Pair>();
		
		TreeMap<Integer, Integer> mp = new TreeMap<Integer, Integer>();
		
		
		q.add(new Pair(root, 0));
		
		
		while(!q.isEmpty()) {
			
			temp = q.peek().first;
			
			int d = q.peek().second;
			
			q.remove();
			
			// If any node is not at that vertical distance
	        // just insert that node in map and print it
			if (mp.get(d) == null) {
				mp.put(d, temp.data);
			}
			
			if(temp.left != null ) {
				q.add(new Pair(temp.left, d-1));
			}
			if(temp.right != null ) {
				q.add(new Pair(temp.right, d+1));
			}
		}
		
		for(Integer data:mp.values()){
	       System.out.print( data + " ");
	    }
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Node root = new Node(1);
	    root.left = new Node(2);
	    root.right = new Node(3);
	    root.left.right = new Node(4);
	    root.left.right.right = new Node(5);
	    root.left.right.right.right = new Node(6);
	    System.out.println( "Following are nodes in top view of Binary Tree\n");
	    topView(root);
	}
}


/ *
Time Complexity of the above implementation is O(nlogn) where n is the number of nodes in the given binary 
tree with each insertion operation in Map requiring O(log2n) complexity.
*/
