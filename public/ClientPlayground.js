

function ClientPlayground(el){

    var attributes = {
        'el': el,
        w: 0,
        h: 0
    };

    return {
        init: function(){
            attributes.w = attributes.el.width();
            attributes.h = attributes.el.height();
        },

        getDimension: function(){
            return {
                w:attributes.w,
                h:attributes.h
            }
        }
    }
}
