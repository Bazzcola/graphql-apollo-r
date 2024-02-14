import { Header as HeaderWrapper } from './components/Header/Header';
import { NewsList } from './components/NewsList/NewsList';

export const App = () => {
  return (
    <HeaderWrapper>
      <NewsList />
    </HeaderWrapper>
  );
};