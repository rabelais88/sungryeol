import { useQueryRoute } from '@/lib/hooks';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import _debounce from 'lodash/debounce';
import { useMemo } from 'react';
import IconSearch from '../icons/IconSearch';

const SearchBox = () => {
  const { keyword, setKeyword } = useQueryRoute();
  const debouncedSetKeyword = useMemo(
    () => _debounce(setKeyword, 200, { trailing: true }),
    []
  );

  return (
    <InputGroup>
      <Input
        type="search"
        defaultValue={keyword}
        onChange={(ev) => {
          debouncedSetKeyword(ev.target.value);
        }}
        placeholder={'keyword / 키워드'}
        sx={{
          _placeholder: {
            color: 'gray.300',
          },
          '&::-webkit-search-cancel-button': {
            height: '1em',
            width: '1em',
            borderRadius: '50em',
            background: `url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%`,
            backgroundSize: 'contain',
            opacity: 0,
            pointerEvents: 'none',
          },
        }}
      />
      <InputRightElement>
        <IconButton
          variant="ghost"
          sx={{ borderRadius: 0 }}
          aria-label="search"
        >
          <IconSearch />
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBox;
