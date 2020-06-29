import Image from './ParallaxImage';
import ScrollView from './ParallaxScrollView';

interface Module {
  Image: typeof Image;
  ScrollView: typeof ScrollView;
}

const Parallax: Module = {
  Image,
  ScrollView,
};
export default Parallax;
