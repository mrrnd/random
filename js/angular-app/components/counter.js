randomApp.component('counter', {
    bindings: {
        days: '<',
        hours: '<',
        minutes: '<',
        seconds: '<',
        date: '<',
        countdown: '<',
        numLen: '<'
    },

    templateUrl: 'pages/partials/counter.html',

    controller: function counter($scope, $interval) {
        var ctrl = this;

        this.numLen = this.numLen || 1;
        
        this.$onInit = function() {
            var now = Date.now();
            var zeros = new Array(this.numLen).join('0');
            var minNum = Math.pow(10, this.numLen - 1);
            var absRange = 0;
            var date;
            var range;

            if (this.date) {
                switch (typeof this.date) {
                    case 'string':
                        date = Date.parse(this.date);

                        if (isNaN(date)) {
                            console.error('[counter] date have wrong format: ' + this.date);
                            return
                        }

                        break;

                    case 'object':
                        if (!(this.date instanceof Date)) {
                            console.error('[counter] date object is not Date instance:', this.date);
                            return
                        }

                        date = this.date.getTime()
                }

                range = Math.floor((date - now) / 1000);

                if (range < 0 && !this.countdown) {
                    absRange = Math.abs(range)
                } else if (range >= 0 && this.countdown) {
                    absRange = range
                }

                console.log(absRange);

                this.days = Math.floor(absRange / 86400);
                absRange %= 86400;

                this.hours = Math.floor(absRange / 3600);
                absRange %= 3600;

                this.minutes = Math.floor(absRange / 60);
                absRange %= 60;

                this.seconds = Math.floor(absRange % 60);
            } else {
                this.days = this.days || 0;
                this.hours = this.hours || 0;
                this.minutes = this.minutes || 0;
                this.seconds = this.seconds || 0;
            }

            this.$interval = $interval(function() {
                if (ctrl.countdown)  {
                    --ctrl.seconds < 0
                    && (ctrl.seconds = 59)
                    && --ctrl.minutes < 0
                    && (ctrl.minutes = 59)
                    && --ctrl.hours < 0
                    && (ctrl.hours = 23)
                    && (--ctrl.days < 0)
                    && (ctrl.days = 0)
                } else {
                    ++ctrl.seconds > 59
                    && !(ctrl.seconds = 0)
                    && ++ctrl.minutes > 59
                    && !(ctrl.minutes = 0)
                    && ++ctrl.hours > 23
                    && !(ctrl.hours = 0)
                    && ++ctrl.days
                }

                $scope.days = ctrl.days < minNum ? (zeros + ctrl.days).slice(-ctrl.numLen) : ctrl.days;
                $scope.hours = ctrl.hours < minNum ? (zeros + ctrl.hours).slice(-ctrl.numLen) : ctrl.hours;
                $scope.minutes = ctrl.minutes < minNum ? (zeros + ctrl.minutes).slice(-ctrl.numLen) : ctrl.minutes;
                $scope.seconds = ctrl.seconds < minNum ? (zeros + ctrl.seconds).slice(-ctrl.numLen) : ctrl.seconds;
            }, 1000)
        };

        this.$onDestroy  = function() {
            $interval.cancel(this.$interval)
        }
    }
});
