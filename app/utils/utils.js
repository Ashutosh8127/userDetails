export function capitalize(string) {
    // caps each word in a string
    var words = string.trim().split(/\s+/);
    var capitalized = words.map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return capitalized.join(' ');
  }
  
  export function toFormData({ ...data }) {
    var formData = new FormData();
    for (name in data)
      formData.append(name, data[name]);
    return formData;
  }
  
  export function isNetworkError(e) {
    return e.message == 'Network request failed';
  }