function isAnagram(str1, str2) {
    // the two str without space
    const cleanStr1 = str1.replace(/\s/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    //convert to array, sort by alpha then gather them to string agn
    const sortedStr1 = cleanStr1.split('').sort().join('');
    const sortedStr2 = cleanStr2.split('').sort().join('');
  
    //compare
    return sortedStr1 === sortedStr2;
  }
  