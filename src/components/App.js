import Breadcrumb from './Breadcrumb.js';
import Nodes from './Nodes.js';
import { requests } from '../utils/index.js';
import Modal from './Modal.js';

export default function App($target) {
  this.init = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const { currentNode } = this.$state.currentNode;
      const nodeList = await requests(currentNode);
      console.log(nodeList);
      this.setState({
        isLoading: false,
        nodeList,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  this.setup = () => {
    this.$state = {
      isLoading: true,
      isRoot: true,
      paths: [],
      ids: [],
      currentNode: '',
      nodeList: [],
      isModalShow: false,
      modalFilePath: '/images/a2i.jpg',
    };
    this.init();
  };

  this.handleDirClick = (pathName, id) => {
    const { paths, ids } = this.$state;
    this.setState({
      isRoot: false,
      paths: [...paths, pathName],
      ids: [...ids, id],
      currentNode: `${id}`,
    });
    this.init();
  };

  this.handleFileClick = (filePath) => {
    this.setState({
      isModalShow: true,
      modalFilePath: filePath,
    });
  };

  this.handleBackSpace = () => {
    const { paths, ids } = this.$state;
    this.setState({
      isRoot: paths.length === 1,
      paths: paths.slice(0, -1),
      ids: ids.slice(0, -1),
      currentNode: `${ids.length >= 2 ? ids[ids.length - 2] : ''}`,
    });
    this.init();
  };

  this.handleModalClick = () => {
    this.setState({
      isModalShow: false,
    });
  };

  this.setEvent = () => {};

  this.template = () => {
    const { isLoading } = this.$state;

    return isLoading
      ? `
      <div>
        로딩 중입니다... 잠시만 기다려 주세요
      </div>
    `
      : `
      <nav class="Breadcrumb"></nav>
      <div class="Nodes"></div>
      <div class="Modal"></div>
    `;
  };

  this.mounted = () => {
    const { paths, nodeList, isRoot, isModalShow, modalFilePath } = this.$state;
    const $Breadcrumb = this.$target.querySelector('.Breadcrumb');
    const $Nodes = this.$target.querySelector('.Nodes');
    const $Modal = this.$target.querySelector('.Modal');

    new Breadcrumb($Breadcrumb, {
      paths,
    });

    new Nodes($Nodes, {
      nodeList,
      isRoot,
      handleDirClick: this.handleDirClick.bind(this),
      handleFileClick: this.handleFileClick.bind(this),
      handleBackSpace: this.handleBackSpace.bind(this),
    });

    new Modal($Modal, {
      isModalShow,
      filePath: modalFilePath,
      handleModalClick: this.handleModalClick.bind(this),
    });
  };

  this.render = () => {
    const { isLoading } = this.$state;

    this.$target.innerHTML = this.template();
    if (!isLoading) this.mounted();
  };

  this.setState = (newState) => {
    this.$state = { ...this.$state, ...newState };
    this.render();
  };

  this.$target = $target;
  this.setup();
  this.setEvent();
  this.render();
}
