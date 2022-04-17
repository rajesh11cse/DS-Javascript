import java.util.*;
import java.util.Queue;
import java.util.LinkedList;
import java.util.Map.Entry;

public class VerticalOrderBTree {
	static class Node{
		int data;
		Node left;
		Node right;
		Node(int val){
			data = val;
			left = right = null;
		}
	} 
	
	static void printLevelOrder(Node root) {
		Queue <Node> q = new LinkedList<Node>();
		q.add(root);
		
		while(!q.isEmpty()) {
			Node temp =q.poll();
			System.out.print(temp.data+" ");
			
			if (temp.left != null)
				q.add(temp.left);
			if (temp.right != null)
				q.add(temp.right);
		}
		
	}
	
	static void getVerticalOrder(Node root, int hd, TreeMap<Integer, Vector<Integer>> m) {
		
		if (root == null)
			return;
		
		Vector<Integer> vList = m.get(hd);
		if (vList == null) {
			vList = new Vector<>();
		}
			
		vList.add(root.data);
		m.put(hd, vList);
		
		getVerticalOrder(root.left, hd-1, m);
		getVerticalOrder(root.right, hd+1, m);
		
		
	}
	
	static void printVericalOrder(Node root) {
		TreeMap <Integer, Vector<Integer>> m = new TreeMap<>();
		
		int hd = 0;
		getVerticalOrder(root, hd, m);
		
		for (Entry<Integer, Vector<Integer>> entry : m.entrySet()) {
			System.out.println(entry.getValue());
		}
		
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Node root = new Node(1);
		
		root.left = new Node(2);
		root.right = new Node(3);
		root.left.left = new Node(4);
		root.left.right = new Node(5);
		root.right.left = new Node(6);
		root.right.right = new Node(7);
		root.right.left.right = new Node(8);
		root.right.right.right = new Node(9);
		System.out.println("Vertical order traversal is");
		printVericalOrder(root);

	}
}

/* Input 
 *          1
 *        /   \
 *   	 2     3
 *   	/  \  / \
 *     4    56   7
 *            \   \
 *             8   9
 * 
 * 
 * Output
 *  [4]
 *  [2]
 *  [1, 5, 6]
 *  [3, 8]
 *  [7]
 *  [9]
	
 */
