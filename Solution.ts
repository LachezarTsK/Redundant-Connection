
function findRedundantConnection(edges: number[][]): number[] {
    const unionFind = new UnionFind(edges.length + 1);
    const redundantConnection: number[] = new Array();

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

    private parent: number[];
    private rank: number[];

    constructor(numberOfComponents: number) {
        this.parent = Array.from(new Array(numberOfComponents).keys());
        this.rank = new Array(numberOfComponents).fill(1);
    }

    findParent(index: number): number {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    joinByRank(indexOne: number, indexTwo: number): boolean {
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

    cycleFound(parentFirst: number, parentSecond: number): boolean {
        return parentFirst === parentSecond;
    }
}
