
import java.util.Arrays;
import java.util.stream.IntStream;

public class Solution {

    public int[] findRedundantConnection(int[][] edges) {
        UnionFind unionFind = new UnionFind(edges.length + 1);
        int[] redundantConnection = new int[2];

        for (int[] edge : edges) {
            if (!unionFind.joinByRank(edge[0], edge[1])) {
                redundantConnection[0] = edge[0];
                redundantConnection[1] = edge[1];
                break;
            }
        }
        return redundantConnection;
    }
}

class UnionFind {

    private final int parent[];
    private final int rank[];

    UnionFind(int numberOfComponents) {
        parent = IntStream.range(0, numberOfComponents).toArray();
        rank = new int[numberOfComponents];
        Arrays.fill(rank, 1);
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    boolean joinByRank(int indexOne, int indexTwo) {
        int first = findParent(indexOne);
        int second = findParent(indexTwo);
        if (cycleFound(first, second)) {
            return false;
        }

        if (rank[first] > rank[second]) {
            parent[second] = first;
            rank[first] += rank[second];
        } else {
            parent[first] = second;
            rank[second] += rank[first];
        }
        return true;
    }

    boolean cycleFound(int parentFirst, int parentSecond) {
        return parentFirst == parentSecond;
    }
}
