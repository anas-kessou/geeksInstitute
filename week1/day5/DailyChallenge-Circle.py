import math
# import turtle
# import tkinter as TK
class Circle:
    def __init__(self, radius=None , diameter=None ):
        if radius is None and diameter is None:
            print("You must specify either radius or diameter.")
        elif radius is not None :
            self.radius = float(radius)
        elif diameter is not None :
            self.radius = float(diameter / 2)
        
    def area(self):
        return math.pi * (self.radius ** 2)
    
    def __str__(self):
        return f"Circle with radius {self.radius:.2f} , diameter {self.radius*2:.2f} and area {self.area():.2f}"
    
    def __add__(self, other):
        return Circle(radius=self.radius + other.radius)
    
    def __gt__(self, other):
        if self.radius > other.radius:
            return True
        else:
            return False
    
    def __eq__(self, other):
        if self.radius == other.radius:
             return True
        else:
             return False
def srted_circles(l):
    sorted_circles = sorted(l)
    for circle in sorted_circles:
        print(circle)

#bonus

"""
def draw_circles(circles):
    screen = turtle.Screen()
    screen.bgcolor("white")
    pen = turtle.Turtle()
    pen.speed(0)

    y_offset = -200
    for circle in sorted(circles):
        pen.penup()
        pen.goto(0, y_offset)
        pen.pendown()
        pen.circle(circle.radius * 10)  
        y_offset += 30  

    turtle.done()
"""   

c1=Circle(radius=5)
c2=Circle(radius=10)
c3=Circle(radius=15)
c4=Circle(radius=10)
l=[c1,c2,c3,c4]
srted_circles(l)

print(c1.area())



print(c1.__str__())
print(c3.__str__())


print(c1.__add__(c2))



print(c3.__gt__(c2))
print(c1.__gt__(c3))


print(c4.__eq__(c2))


"""draw_circles(l) #mabghax ysda9 liya 😅"""


    

        
        
        
    