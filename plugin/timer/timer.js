var timer = {
  max_timeout: 11,
  timeout: 0,
  text_element: null,
  interval_handle: null,
};

timer.initialize=function() {
  this.timeout = this.max_timeout;
  var title_footer=document.createElement('footer');
  title_footer.setAttribute('id','timer');
  // title_footer.setAttribute('style','background:'+this.background);
  var title_footer_p=document.createElement('p');
  title_footer.appendChild(title_footer_p);
  var timer_text = document.createTextNode(this.timeout);
  title_footer_p.appendChild(timer_text);
  title_footer_p.setAttribute('style', 'color: lightgreen;');
  this.text_element = title_footer_p;
  var div_class_reveal=document.querySelectorAll('.reveal')[0];
  div_class_reveal.appendChild(title_footer);
  timer.start();
}

timer.reset=function() {
  this.timeout = this.max_timeout;
  timer.stop();
  update_timer(this);
}

timer.stop=function() {
  if (this.interval_handle != null) {
    window.clearInterval(this.interval_handle);
    this.interval_handle = null;
  }
}

timer.start=function() {
  this.interval_handle = window.setInterval(update_timer, 1000, this);
}

function update_timer(timer) {
  if (timer.timeout > 0) {
    timer.timeout -= 1;
    timer.text_element.removeChild(timer.text_element.firstChild);
    timer.text_element.appendChild(document.createTextNode(timer.timeout))
     if (timer.timeout <= 3) {
      timer.text_element.style.color = 'red';
    } else if (timer.timeout <= timer.max_timeout / 2) {
      timer.text_element.style.color = 'yellow';
    } else {
      timer.text_element.style.color = 'lightgreen';
    }
  } else {
    timer.stop();
    Reveal.down();
  }
};

Reveal.addEventListener( 'slidechanged', function( event ) {
  if (event.currentSlide.getAttribute('data-state') == 'question') {
    timer.reset();
    timer.start();
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  }
} );