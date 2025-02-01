
package main

func findRedundantConnection(edges [][]int) []int {
    unionFind := NewUnionFind(len(edges) + 1)
    redundantConnection := make([]int, 2)

    for _, edge := range edges {
        if !unionFind.joinByRank(edge[0], edge[1]) {
            redundantConnection[0] = edge[0]
            redundantConnection[1] = edge[1]
            break
        }
    }
    return redundantConnection
}

type UnionFind struct {
    parent []int
    rank   []int
}

func NewUnionFind(numberOfComponents int) UnionFind {
    unionFind := UnionFind{
        parent: make([]int, numberOfComponents),
        rank:   make([]int, numberOfComponents),
    }
    for i := 0; i < numberOfComponents; i++ {
        unionFind.parent[i] = i
        unionFind.rank[i] = 1
    }
    return unionFind
}

func (this *UnionFind) findParent(index int) int {
    if this.parent[index] != index {
        this.parent[index] = this.findParent(this.parent[index])
    }
    return this.parent[index]
}

func (this *UnionFind) joinByRank(indexOne int, indexTwo int) bool {
    first := this.findParent(indexOne)
    second := this.findParent(indexTwo)
    if this.cycleFound(first, second) {
        return false
    }

    if this.rank[first] > this.rank[second] {
        this.parent[second] = first
        this.rank[first] += this.rank[second]
    } else {
        this.parent[first] = second
        this.rank[second] += this.rank[first]
    }
    return true
}

func (this *UnionFind) cycleFound(parentFirst int, parentSecond int) bool {
    return parentFirst == parentSecond
}
