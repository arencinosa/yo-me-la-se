#!/usr/bin/env ruby

require 'csv'
require 'json'

data = CSV.read(ARGV[0])
db = Hash.new {|h,k| h[k] = []}
data[1..-1].each do |row|
    n,p,o1,o2,e,f = row
    (db[n] << {
        question: p,
        options: [
            o1,
            o2
        ]
    }) unless f
end

f = open(ARGV[1], 'w')

f.write(JSON.pretty_generate(db, {indent: '    '}))
f.close()
