function PcInputManager (target) {
   
    var mMouseX;
    var mMouseY;

    var mLeftMouseDown;
    var mRightMouseDown;
    var mWheelMouseDown;

    var mWheelDelta;
    var mMouseHorizontalDelta;
    var mMouseVerticalDelta;

    this.update = function () {
        target.addEventListener('mousedown', handleMouseDown, false);
        target.addEventListener('mouseup', handleMouseUp, false);
        target.addEventListener('mousemove', handleMouseMove, false);
        target.addEventListener('mousewheel', handleWheelDelta, false);
    };

    this.postUpdate = function () {
        mWheelDelta = 0;
        mMouseHorizontalDelta = 0;
        mMouseVerticalDelta = 0;
    };

    this.getWheelDelta = function () {
        return mWheelDelta;
    };

    this.getMousePosition = function () {
        return { x: mMouseX, y: mMouseY };
    };

    this.isLeftMouseDown = function () {
        return mLeftMouseDown;
    };

    this.isRightMouseDonw = function () {
        return mRightMouseDown;
    };

    this.isWheelMouseDown = function () {
        return mWheelMouseDown;
    };

    this.getMouseHorizontalDelta = function () {
        return mMouseHorizontalDelta;
    };

    this.getMouseVerticalDelta = function () {
        return mMouseVerticalDelta;
    };

    var handleMouseDown = function (event) {

        switch (event.which) {
            case 1:
                console.log("LeftMouseDown");
                mLeftMouseDown = true;
                break;
            case 2:
                console.log("MiddleMouseDown");
                mWheelMouseDown = true;
                break;

            case 3:
                console.log("RightMouseDown");
                mRightMouseDown = true;
                break;

        }
    };

    var handleMouseUp = function (event) {
        switch (event.which) {
            case 1:
                console.log("LeftMouseUp");
                mLeftMouseDown = false;
                break;
            case 2:
                console.log("MiddleMouseUp");
                mWheelMouseDown = false;
                break;

            case 3:
                console.log("RightMouseUp");
                mRightMouseDown = false;
                break;

        }
    };

    var handleMouseMove = function (event) {
        console.log("mouse is moving");

        mMouseHorizontalDelta = mMouseX - event.clientX;
        mMouseVerticalDelta = mMouseY - event.clientY;

        mMouseX = event.clientX;
        mMouseY = event.clientY;
    };

    var handleWheelDelta = function (event) {
        mWheelDelta = event.wheelDelta;
        console.log("wheelIsMoving: " + mWheelDelta);
    };

    return this;
}