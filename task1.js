/**
 * adds 'overloaded' method implementations to this object.
 `.overload` decides which implementation to use based on 1) number of arguments, 2) arguments' types
 * @constructor
 */
function ObjectWithMethodOverloading(){
}

ObjectWithMethodOverloading.prototype.overload = function(method,func,args){
    var argsJoin;

    if(!this.hasOwnProperty(method)){
        this[method] = function (){

            var argsFunc;

            if(this[method].hasOwnProperty(arguments.length.toString())){
                argsFunc = Array.prototype.reduce.call(arguments,function(prev,current){return prev+typeof(current)},'');

                if(this[method][arguments.length.toString()].hasOwnProperty(argsFunc)){
                    return this[method][arguments.length.toString()][argsFunc].apply(this,arguments);

                }else{
                   // console.log( this[method][arguments.length.toString()]);
                    return this[method][arguments.length.toString()].apply(this,arguments);

                }
            }
        }
    }

    if(args !== undefined && args.length>0){
        if(!this[method].hasOwnProperty(func.length.toString())){
            this[method][func.length.toString()] = {};

        }
        argsJoin = args.reduce(function(prev,current){return prev+current.name.toLowerCase()},'');
        this[method][func.length.toString()][argsJoin] = func;

    }else{
        this[method][func.length.toString()] = func;

    }
};
