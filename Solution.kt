
class Solution {

    fun findRedundantConnection(edges: Array<IntArray>): IntArray {
        val unionFind = UnionFind(edges.size + 1)
        val redundantConnection = IntArray(2)

        for (edge in edges) {
            if (!unionFind.joinByRank(edge[0], edge[1])) {
                redundantConnection[0] = edge[0]
                redundantConnection[1] = edge[1]
                break
            }
        }
        return redundantConnection
    }
}

class UnionFind(private val numberOfComponents: Int) {

    private val parent = IntArray(numberOfComponents) { n -> n }
    private var rank = IntArray(numberOfComponents) { 1 }

    fun findParent(index: Int): Int {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index])
        }
        return parent[index]
    }

    fun joinByRank(indexOne: Int, indexTwo: Int): Boolean {
        val first = findParent(indexOne)
        val second = findParent(indexTwo)
        if (cycleFound(first, second)) {
            return false
        }

        if (rank[first] > rank[second]) {
            parent[second] = first
            rank[first] += rank[second]
        } else {
            parent[first] = second
            rank[second] += rank[first]
        }
        return true
    }

    private fun cycleFound(parentFirst: Int, parentSecond: Int): Boolean {
        return parentFirst == parentSecond
    }
}
