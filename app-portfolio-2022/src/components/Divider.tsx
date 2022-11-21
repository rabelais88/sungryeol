import {
  Divider as ChakraDivider,
  DividerProps,
  useColorMode,
} from '@chakra-ui/react';

const Divider: React.FC<DividerProps> = ({ ...props }) => {
  const { colorMode } = useColorMode();
  return (
    <ChakraDivider
      borderBottomColor={colorMode === 'light' ? 'black' : 'white'}
      {...props}
    />
  );
};

export default Divider;
