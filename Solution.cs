
using System;
using System.Linq;

public class Solution
{
    public int[] FindRedundantConnection(int[][] edges)
    {
        UnionFind unionFind = new UnionFind(edges.Length + 1);
        int[] redundantConnection = new int[2];

        foreach (int[] edge in edges)
        {
            if (!unionFind.JoinByRank(edge[0], edge[1]))
            {
                redundantConnection[0] = edge[0];
                redundantConnection[1] = edge[1];
                break;
            }
        }
        return redundantConnection;
    }

}

class UnionFind
{
    private readonly int[] parent;
    private readonly int[] rank;

    public UnionFind(int numberOfComponents)
    {
        parent = Enumerable.Range(0, numberOfComponents).ToArray<int>();
        rank = new int[numberOfComponents];
        Array.Fill(rank, 1);
    }

    public int FindParent(int index)
    {
        if (parent[index] != index)
        {
            parent[index] = FindParent(parent[index]);
        }
        return parent[index];
    }

    public bool JoinByRank(int indexOne, int indexTwo)
    {
        int first = FindParent(indexOne);
        int second = FindParent(indexTwo);
        if (CycleFound(first, second))
        {
            return false;
        }

        if (rank[first] > rank[second])
        {
            parent[second] = first;
            rank[first] += rank[second];
        }
        else
        {
            parent[first] = second;
            rank[second] += rank[first];
        }
        return true;
    }

    private bool CycleFound(int parentFirst, int parentSecond)
    {
        return parentFirst == parentSecond;
    }
}
