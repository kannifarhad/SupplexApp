import { connect, useSelector } from 'react-redux';
function TranslateComponent({ translations, children, dispatch, ...rest}) {
  const checkWord = (dictionary, word) => {
    try {
      return typeof dictionary[word] !== 'undefined' ? dictionary[word] : word;
    } catch (error) {
      return word;
    }
  };

  const stringInject = (str) => {
    let keyList = Object.keys(rest);
    if (keyList.length > 0) {
      if (typeof str !== 'string') {
        return false;
      }
      return str.replace(/%(.*?)%/g, function (i) {
        let key = i.replace(/(%)/g, '');
        return typeof rest[key] != 'undefined' ? rest[key] : '';
      });
    } else {
      return str;
    }
  };

  return stringInject(checkWord(translations.data, children));
}

const mapStateToProps = (store) => {
  return {
    translations: store.dashboard.translations
  };
};

export const Translate = connect(mapStateToProps, null)(TranslateComponent);

export const TranslateFunc = () => {
  const dashboardState = useSelector(store => store.dashboard);
  const { translations } = dashboardState;
  
  const checkWord = (dictionary, word) => {
    try {
      return typeof dictionary[word] !== 'undefined' ? dictionary[word] : word;
    } catch (error) {
      return word;
    }
  };

  const stringInject = (str, arr) => {
    let keyList = Object.keys(arr);
    if (keyList.length > 0) {
      if (typeof str !== 'string') {
        return false;
      }
      return str.replace(/%(.*?)%/g, function (i) {
        let key = i.replace(/(%)/g, '');
        return typeof arr[key] != 'undefined' ? arr[key] : '';
      });
    } else {
      return str;
    }
  };

  return {
    translateWord: (word, replace = {})=>{
      return stringInject(checkWord(translations.data, word), replace);
    }
  };
}
