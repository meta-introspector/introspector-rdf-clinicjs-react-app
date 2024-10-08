for x in `find inputs/huggingface/datasets/mina/o1js-clinic -name \*clinic\*.html`;
do
    y=`echo $x | sed -e's!inputs/huggingface/datasets/mina/o1js-clinic/!!g'`
    echo "<https://huggingface.co/datasets/introspector/o1js-clinic/resolve/main/${y}>" a "<isp:clinic_report>".;
done
#https://huggingface.co/datasets/introspector/o1js-clinic/resolve/main/.clinic/13008.clinic-flame.html

for x in `find inputs/huggingface/datasets/mina/o1js -name \*clinic\*.html`;
do
    y=`echo $x | sed -e's!inputs/huggingface/datasets/mina/o1js/!!g'`
    echo "<https://huggingface.co/datasets/introspector/o1js-peformance-results/resolve/main/${y}>" a "<isp:clinic_report>".;
done

#https://huggingface.co/datasets/introspector/o1js-peformance-results/raw/main/13008.clinic-flame.html
