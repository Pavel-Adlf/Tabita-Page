class ApplicationSettings { 
  static widgets = localStorage.getItem('widgets') !== null ? JSON.parse(localStorage.getItem('widgets')) : ['timeModule', 'weatherModule'];
  static widgetList = ['timeModule', 'weatherModule']
  static widgetSize = document.body && [document.body.clientWidth,document.body.clientHeight]
  static search = localStorage.getItem('search') !== null ? JSON.parse(localStorage.getItem('search')) : 'nature';
}

export default ApplicationSettings;