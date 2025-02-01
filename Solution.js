
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    const unionFind = new UnionFind(edges.length + 1);
    const redundantConnection = new Array();

    for (let edge of edges) {
        if (!unionFind.joinByRank(edge[0], edge[1])) {
            redundantConnection[0] = edge[0];
            redundantConnection[1] = edge[1];
            break;
        }
    }
    return redundantConnection;
};

class UnionFind {

    #parent;
    #rank;

    /**
     * @param {number} numberOfComponents
     */
    constructor(numberOfComponents) {
        this.parent = Array.from(new Array(numberOfComponents).keys());
        this.rank = new Array(numberOfComponents).fill(1);
    }

    /**
     * @param {number} index
     * @return {number}
     */
    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    /**
     * @param {number} indexOne
     * @param {number} indexTwo
     * @return {boolean}
     */
    joinByRank(indexOne, indexTwo) {
        const first = this.findParent(indexOne);
        const second = this.findParent(indexTwo);
        if (this.cycleFound(first, second)) {
            return false;
        }

        if (this.rank[first] > this.rank[second]) {
            this.parent[second] = first;
            this.rank[first] += this.rank[second];
        } else {
            this.parent[first] = second;
            this.rank[second] += this.rank[first];
        }
        return true;
    }

    /**
     * @param {number} parentFirst
     * @param {number} parentSecond
     * @return {boolean}
     */
    cycleFound(parentFirst, parentSecond) {
        return parentFirst === parentSecond;
    }
}
