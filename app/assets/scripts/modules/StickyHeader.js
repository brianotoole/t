// Sticky Header

import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {

  constructor() {
    this.header = $('.header');
    this.trigger = $('.hero__title');
    this.createHeaderWaypoint();
  }

  createHeaderWaypoint() {
    var that = this;
    new Waypoint({
      element: this.trigger[0], //trigger waypoint on reaching this element
      handler: function(direction) { //what should happen when trigger el is reached
        if (direction == "down") {
          that.header.addClass('header--is-fixed');
        } else {
          that.header.removeClass('header--is-fixed');
        }
      } 
    });
  }


}

export default StickyHeader;