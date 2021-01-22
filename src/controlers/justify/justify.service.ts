import { Injectable } from '@nestjs/common';

interface Node {
  word: string;
  length: number;
  sumLength: number;
  next: Node | null;
  prev: Node | null;
}

@Injectable()
export class JustifyService {
  result = '';
  initNode = (word: string): Node => ({
    word,
    length: word.length,
    sumLength: word.length,
    next: null,
    prev: null,
  });

  addNode = (currentNode: Node, word: string): Node => {
    if (currentNode.next === null) {
      currentNode.next = {
        word,
        length: word.length,
        sumLength: currentNode.sumLength + word.length,
        next: null,
        prev: currentNode,
      };
    } else {
      const tmp = currentNode.next;
      currentNode.next = {
        word,
        length: word.length,
        sumLength: currentNode.sumLength + word.length,
        next: tmp,
        prev: currentNode,
      };
    }
    return currentNode.next;
  };

  addSpaceNode = (currentNode: Node): Node => {
    return this.addNode(currentNode, ' ');
  };

  displayNodes = (nodes: Node[]): string => {
    let str = '';
    for (const node of nodes) {
      let tmp = node;
      while (tmp.next) {
        str += tmp.word;
        tmp = tmp.next;
      }
      str += tmp.word;
    }
    return str;
  };

  addRandomlySpaces = (node: Node, padding: number) => {
    for (let i = 0; i < padding; i++) {
      this.addSpaceNode(node);
    }
  };

  justify(text: string): string {
    const sentences = text.trim().split('\n');
    let res = '';
    for (const sentence of sentences) {
      if (sentence.length) {
        const words = sentence.split(' ');
        const nodesStart = [];
        const nodeStart = this.initNode(words[0]);
        nodesStart.push(nodeStart);
        let tmp = this.addSpaceNode(nodeStart);
        for (let i = 1; i < words.length; i++) {
          if (words[i].length + tmp.sumLength <= 80) {
            tmp = this.addNode(tmp, words[i]);
            tmp = this.addSpaceNode(tmp);
          } else {
            this.addRandomlySpaces(
              nodesStart[nodesStart.length - 1],
              81 - tmp.sumLength,
            );
            tmp.word = '\n';
            tmp = this.initNode(words[i]);
            nodesStart.push(tmp);
            tmp = this.addSpaceNode(tmp);
          }
        }
        tmp.word = '\n';
        res += this.displayNodes(nodesStart);
      }
    }
    return res;
  }
}
